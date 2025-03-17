import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import type { MenuItem, TableOfContentsProps } from './tableOfContens.types';

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderItems = (menuItems: MenuItem[], level: number = 0) => {
    return (
      <ul className="list-none space-y-2">
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedItems.includes(item.id);

          return (
            <li key={item.id} className={`
              ${level > 0 ? 'ml-7' : ''}
            `}>
              <div className="flex items-center gap-2 py-1">
                <div className="flex items-center gap-1 min-w-[48px]">
                  {hasSubItems && (
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-200"
                    >
                      {isExpanded ? (
                        <FaChevronUp className="text-gray-500 text-sm" />
                      ) : (
                        <FaChevronDown className="text-gray-500 text-sm" />
                      )}
                    </button>
                  )}
                  {!hasSubItems && <div className="w-[28px]" />} {/* Espaciador cuando no hay flecha */}
                  {item.icon && (
                    <item.icon 
                      className={`text-lg ${
                        item.isActive 
                          ? 'text-blue-700 dark:text-blue-500'
                          : 'text-gray-600'
                      }`}
                    />
                  )}
                </div>
                <a 
                  href={item.href}
                  className={`
                    flex-grow transition-colors duration-200
                    ${item.isActive 
                      ? 'text-blue-700 font-medium dark:text-blue-500'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300'
                    }
                  `}
                >
                  {item.title}
                </a>
              </div>
              {hasSubItems && isExpanded && (
                renderItems(item.subItems || [], level + 1)
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav id="TableOfContents">
      {renderItems(items)}
    </nav>
  );
};

export default TableOfContents;
