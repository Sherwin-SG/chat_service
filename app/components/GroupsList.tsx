import React from 'react';
import { Group } from '../types';  

interface GroupsListProps {
  groups: Group[];
  onSelectGroup: (group: Group) => void;
  selectedGroup: Group | null;
  onLeaveGroup: (groupId: string) => void;
  userId: string;  
}

const GroupsList: React.FC<GroupsListProps> = ({ groups, onSelectGroup, selectedGroup, onLeaveGroup, userId }) => {
 
  const filteredGroups = groups.filter(group => group.members.includes(userId));

  return (
    <div className="space-y-4">
      {filteredGroups.length === 0 ? (
        <p>No groups available</p>
      ) : (
        filteredGroups.map((group) => (
          <div
            key={group._id}
            className={`p-4 rounded-lg shadow-md cursor-pointer ${
              selectedGroup?._id === group._id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => onSelectGroup(group)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              <button 
                className="ml-2 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();  
                  onLeaveGroup(group._id);
                }}
              >
                Leave
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupsList;
