import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

const HistoryOrder = ({ detailHistory }) => {
  return (
    <div className="bg-white w-64">
      <div>
        <p className="text-lg text-center p-2 font-semibold">History Order</p>
        {detailHistory ? (
          <Timeline position="alternate">
            {detailHistory?.map((data) => (
              <TimelineItem>
                <TimelineOppositeContent>
                  <p className="text-xs">{data.tanggal}</p>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <p className="text-xs">{data.status}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <div className="flex items-center justify-center h-72">
            <p>No Data Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryOrder;
