import React from "react";
import { meetingTypes } from "../../constants/meetings";

const MeetingTypeList = () => {
  return (
    <div className="flex flex-col gap-4">
      {meetingTypes.map((type) => (
        <div key={type.id} className="p-4 bg-slate-700 rounded">
          <h3 className="text-white font-bold">{type.title}</h3>
          <p className="text-slate-300">{type.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MeetingTypeList;
