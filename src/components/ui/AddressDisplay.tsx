import React, { useState } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { formatAddress } from "@/utils/formatters";

interface AddressDisplayProps {
  address: string;
  showCopy?: boolean;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <Box className="flex items-center gap-2">
      <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg font-mono">
        {formatAddress(address)}
      </code>
      {showCopy && (
        <Tooltip title={copied ? "Copied!" : "Copy address"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
