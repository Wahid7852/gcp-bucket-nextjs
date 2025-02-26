"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('@/components/ui/card').then(mod => mod.Card), { ssr: false });
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => mod.CardContent), { ssr: false });
const TrashIcon = dynamic(() => import('@/components/Icons').then(mod => mod.TrashIcon), { ssr: false });
const EyeIcon = dynamic(() => import('@/components/Icons').then(mod => mod.EyeIcon), { ssr: false });
const EyeOffIcon = dynamic(() => import('@/components/Icons').then(mod => mod.EyeOffIcon), { ssr: false });
const CopyIcon = dynamic(() => import('@/components/Icons').then(mod => mod.CopyIcon), { ssr: false });

interface APIKeyCardProps {
  apiKey: any;
  onCopy?: (key: string) => void;
  onDelete: (id: string) => void;
  toast: any;
}

const APIKeyCard = ({ apiKey, onCopy, onDelete, toast }: APIKeyCardProps) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy(apiKey.key);
  };

  return (
    <Card className="w-full border border-primary/10 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-lg font-semibold">{apiKey.description}</p>
          <Button
            variant="destructive"
            size="sm"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-destructive/90"
            onClick={() => onDelete(apiKey.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <p className="text-sm text-muted-foreground flex-grow">
            Key: {showKey ? apiKey.key : "••••••••••••••••"}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-primary/10"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-primary/10"
            onClick={handleCopy}
          >
            {copied ? (
              <span className="text-green-500">Copied</span>
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyCard;
