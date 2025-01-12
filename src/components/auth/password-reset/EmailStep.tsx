import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmailStepProps {
  email: string;
  loading: boolean;
  error?: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const EmailStep = ({
  email,
  loading,
  error,
  onEmailChange,
  onSubmit,
  onBack
}: EmailStepProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        className={`w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
    <Button
      type="submit"
      className="w-full"
      disabled={loading}
    >
      {loading ? "Sending..." : "Send Reset Code"}
    </Button>
    <Button
      type="button"
      variant="ghost"
      onClick={onBack}
      className="w-full"
    >
      Back to Login
    </Button>
  </form>
);