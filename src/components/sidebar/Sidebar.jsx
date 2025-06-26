import React, { useState } from "react";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const MenuItem = ({ icon, label }) => (
    <div className={`flex items-center gap-3 h-11 rounded-full cursor-pointer hover:bg-[#e2e6eb] ${
      extended ? "px-3 py-2" : "px-2 py-2 justify-center"
    }`}>
      <img src={icon} alt={label} className="w-5 h-5 flex-shrink-0" />
      {extended && <span className="text-sm text-[#282828]">{label}</span>}
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col justify-between bg-[#f0f4f9] ${
        extended ? "w-[250px]" : "w-[70px]"
      } p-4`}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <div className={`flex items-center h-11 mb-4 rounded-full cursor-pointer hover:bg-[#e2e6eb] ${
          extended ? "px-3 py-2" : "px-2 py-2 justify-center"
        }`}>
          <img
            src={assets.menu_icon}
            alt="Menu"
            onClick={() => setExtended((prev) => !prev)}
            className="w-5 h-5 cursor-pointer flex-shrink-0"
          />
        </div>

        {/* New Chat */}
        <MenuItem icon={assets.plus_icon} label="New Chat" />

        {/* Recent */}
        {extended && (
          <div className="mt-6">
            <p className="text-sm text-gray-700 mb-2 px-3">Recent</p>
            <MenuItem icon={assets.message_icon} label="What is React..." />
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2">
        <MenuItem icon={assets.question_icon} label="Help" />
        <MenuItem icon={assets.history_icon} label="Activity" />
        <MenuItem icon={assets.setting_icon} label="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;