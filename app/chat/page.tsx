'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Hash, Plus, MessageCircle, Loader2, Users } from 'lucide-react';
import { supabase, type ChatRoom, type ChatMessage } from '@/lib/supabase';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ChatPage() {
  const { user, profile } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load rooms
  useEffect(() => {
    async function loadRooms() {
      const { data, error } = await supabase.from('chat_rooms').select('*').order('is_global', { ascending: false }).order('created_at', { ascending: true });
      if (error) {
        console.error('Failed to load rooms:', error);
      } else {
        setRooms(data as ChatRoom[]);
        if (data.length > 0 && !activeRoom) {
          setActiveRoom(data[0] as ChatRoom);
        }
      }
      setLoading(false);
    }
    loadRooms();
  }, []);

  // Load messages for active room
  const loadMessages = useCallback(async (roomId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .limit(100);
    if (error) {
      console.error('Failed to load messages:', error);
    } else {
      setMessages(data as ChatMessage[]);
    }
  }, []);

  useEffect(() => {
    if (activeRoom) {
      loadMessages(activeRoom.id);
    }
  }, [activeRoom, loadMessages]);

  // Realtime subscription
  useEffect(() => {
    if (!activeRoom) return;
    const channel = supabase
      .channel(`chat:${activeRoom.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${activeRoom.id}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as ChatMessage]);
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${activeRoom.id}`,
      }, (payload) => {
        setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeRoom]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || !profile || !activeRoom) return;
    setSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: activeRoom.id,
          user_id: user.id,
          username: profile.username,
          content: input.trim(),
        });
      if (error) throw error;
      setInput('');
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || !user) return;
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert({ name: newRoomName.trim(), created_by: user.id, is_global: false })
        .select()
        .single();
      if (error) throw error;
      setRooms((prev) => [...prev, data as ChatRoom]);
      setActiveRoom(data as ChatRoom);
      setNewRoomName('');
      setShowNewRoom(false);
      toast.success('Room created');
    } catch (err) {
      toast.error('Failed to create room');
    }
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold glow-text">Chat</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Real-time global chat</p>
        </div>
      </div>

      {!user ? (
        <div className="glass-panel rounded-xl p-8 sm:p-12 text-center">
          <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Sign in to chat</h2>
          <p className="text-sm text-muted-foreground">You need an account to send messages and join rooms.</p>
        </div>
      ) : (
        <div className="flex gap-3 sm:gap-4 h-[calc(100vh-220px)] min-h-[400px]">
          {/* Room sidebar */}
          <div className="w-20 sm:w-48 glass-panel rounded-xl p-2 sm:p-3 flex flex-col gap-1 shrink-0 overflow-y-auto scrollbar-thin">
            <div className="text-xs text-muted-foreground px-2 py-1 hidden sm:block">Rooms</div>
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className={cn(
                  'flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors text-left',
                  activeRoom?.id === room.id ? 'bg-primary/15 text-primary border border-primary/30' : 'hover:bg-white/5 text-muted-foreground'
                )}
              >
                <Hash className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate hidden sm:block">{room.name}</span>
                {room.is_global && <Users className="w-3 h-3 shrink-0 sm:hidden" />}
              </button>
            ))}
            <button
              onClick={() => setShowNewRoom(!showNewRoom)}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors mt-1"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:block">New Room</span>
            </button>
            {showNewRoom && (
              <form onSubmit={createRoom} className="px-1 py-1 hidden sm:block">
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="Room name..."
                  className="w-full px-2 py-1.5 rounded-lg bg-black/30 border border-white/10 text-xs outline-none focus:border-primary/50"
                  autoFocus
                />
                <button type="submit" className="w-full mt-1 px-2 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors">
                  Create
                </button>
              </form>
            )}
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col glass-panel rounded-xl overflow-hidden">
            {/* Room header */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 flex items-center gap-2 shrink-0">
              <Hash className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm sm:text-base">{activeRoom?.name || 'Select a room'}</span>
              {activeRoom?.description && <span className="text-xs text-muted-foreground hidden sm:block">&middot; {activeRoom.description}</span>}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-2 sm:p-4 space-y-2">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No messages yet. Say hello!</div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.user_id === user?.id;
                  return (
                    <div key={msg.id} className={cn('flex gap-2', isOwn && 'flex-row-reverse')}>
                      <div className={cn(
                        'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                        isOwn ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-muted-foreground'
                      )}>
                        {msg.username.charAt(0).toUpperCase()}
                      </div>
                      <div className={cn('max-w-[75%] sm:max-w-[60%]', isOwn && 'text-right')}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium">{isOwn ? 'You' : msg.username}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(msg.created_at)}</span>
                        </div>
                        <div className={cn(
                          'inline-block px-3 py-1.5 rounded-xl text-sm break-words',
                          isOwn ? 'bg-primary text-primary-foreground' : 'glass-panel'
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-2 sm:p-3 border-t border-white/10 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
