import React, { useState } from "react";
import * as IconsFA from "react-icons/fa";
import * as IconFA6 from "react-icons/fa6";
import * as IconFi from "react-icons/fi";
import * as IconGi from "react-icons/gi";
import * as IconBs from "react-icons/bs";
import * as IconIo from "react-icons/io5";
import * as IconMd from "react-icons/md";
import * as IconPi from "react-icons/pi";
import * as IconTb from "react-icons/tb";
import * as IconRi from "react-icons/ri";
import * as IconRx from "react-icons/rx";

// Gabungkan semua ikon dalam satu objek
const Icons = {
  ...IconsFA,
  ...IconFA6,
  ...IconFi,
  ...IconGi,
  ...IconBs,
  ...IconIo,
  ...IconMd,
  ...IconPi,
  ...IconTb,
  ...IconRi,
  ...IconRx,
};

export default function IconDropdown({ icon, setIcon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [visibleIcons, setVisibleIcons] = useState(
    Object.keys(Icons).slice(0, 10)
  ); // Tampilkan awal 10 ikon
  const [scrollPosition, setScrollPosition] = useState(10);

  // Fungsi untuk menangani scroll dan lazy loading
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      const nextIcons = Object.keys(Icons)
        .filter((iconName) =>
          iconName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(scrollPosition, scrollPosition + 10); // Tambahkan 10 ikon berikutnya
      setVisibleIcons((prev) => [...prev, ...nextIcons]);
      setScrollPosition(scrollPosition + 10);
    }
  };

  // Fungsi untuk merender ikon
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    if (IconComponent) {
      return <IconComponent className="mr-2" />;
    }
    return null;
  };

  // Fungsi untuk menangani input pencarian
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredIcons = Object.keys(Icons)
      .filter((iconName) =>
        iconName.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10); // Tampilkan hanya 10 ikon pertama yang cocok
    setVisibleIcons(filteredIcons);
    setScrollPosition(10);
  };

  return (
    <div className="relative">
      <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
        Pilih Icon
      </label>
      <div
        className="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && renderIcon(icon)}
          <span>{icon || "-- Pilih Icon --"}</span>
        </div>
        <span className="text-gray-500">
          {isOpen ? (
            <IconFA6.FaAngleUp className="inline" />
          ) : (
            <IconFA6.FaAngleDown className="inline" />
          )}
        </span>
      </div>

      {isOpen && (
        <div
          className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto z-10"
          onScroll={handleScroll}
        >
          {/* Input pencarian tetap di atas */}
          <div className="sticky top-0 bg-white z-20 p-2 border-b">
            <input
              type="text"
              placeholder="Cari icon..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Daftar ikon */}
          <div>
            {visibleIcons.map((iconName) => (
              <div
                key={iconName}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIcon(iconName);
                  setIsOpen(false);
                }}
              >
                {renderIcon(iconName)}
                <span>{iconName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
