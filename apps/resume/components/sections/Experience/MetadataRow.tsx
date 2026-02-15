import { Badge } from '@workspace/ui/components/badge';
import { Calendar, Globe, MapPin } from 'lucide-react';

export default function MetadataRow({
  remote,
  location,
  startDate,
  endDate,
}: {
  remote?: boolean;
  location?: string;
  startDate?: string;
  endDate?: string;
}) {
  return (
    <div className="flex flex-row items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        {remote && (
          <Badge
            variant="outline"
            className="flex items-center h-5 px-1.5 text-muted-foreground border-primary/10"
          >
            <Globe className="h-3 w-3 mr-1" />
            Remote
          </Badge>
        )}
        {location && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}
      </div>
      {startDate && endDate && (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{startDate} - {endDate}</span>
        </div>
      )}
    </div>
  )
}
