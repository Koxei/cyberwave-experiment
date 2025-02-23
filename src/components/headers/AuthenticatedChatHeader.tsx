import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { History, LogOut, MessageCirclePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Chat } from "@/types/chat";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatHistory from "../ChatHistory";
import { useState } from "react";

interface AuthenticatedChatHeaderProps {
  currentChat: Chat | null;
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  onNewChat: () => void;
}

const AuthenticatedChatHeader = ({ 
  currentChat, 
  chats, 
  onChatSelect, 
  onNewChat 
}: AuthenticatedChatHeaderProps) => {
  const navigate = useNavigate();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session check error:', sessionError);
        throw sessionError;
      }
      if (!session) {
        console.log('No active session found, clearing local state');
        localStorage.removeItem('sb-pqzhnpgwhcuxaduvxans-auth-token');
        navigate('/');
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
        });
        return;
      }
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (err: any) {
      console.error('Logout failed:', err);
      toast({
        title: "Logout failed",
        description: err.message || "There was a problem logging out",
        variant: "destructive",
      });
      localStorage.removeItem('sb-pqzhnpgwhcuxaduvxans-auth-token');
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate('/home');
  };

  const handleChatSelect = (chat: Chat) => {
    onChatSelect(chat);
    setIsHistoryOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <div className="relative flex justify-between items-center p-4">
        <div className="absolute inset-x-0 flex justify-center items-center">
          <div className="px-5 py-3 rounded-3xl">
            <h1 className="text-xl font-bold">Chat</h1>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleClose}
            className="text-userMessage hover:text-white transition-colors p-2"
          >
            <X className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="p-2">
                <span className="sr-only">Open menu</span>
                •••
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={onNewChat}>
                <MessageCirclePlus className="mr-2 h-5 w-5" />
                <span>New Chat</span>
              </DropdownMenuItem>
              <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <SheetTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <History className="mr-2 h-5 w-5" />
                    <span>History</span>
                  </DropdownMenuItem>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-aiMessage font-arcade px-4 mt-5">Chat History</SheetTitle>
                  </SheetHeader>
                  <ChatHistory chats={chats} onChatSelect={handleChatSelect} />
                </SheetContent>
              </Sheet>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedChatHeader;