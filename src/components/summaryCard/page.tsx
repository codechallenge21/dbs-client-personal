'use client';

import { OrganizationChannel } from '@/interfaces/entities';

interface SummaryCardProps {
  openUpload?: boolean;
  handleShowDetail?: (channel: OrganizationChannel) => void;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SummaryCard: React.FC<SummaryCardProps> = ({}) => {
  return <></>;
};

export default SummaryCard;
