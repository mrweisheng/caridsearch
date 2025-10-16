'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Vehicle } from '@/types/vehicle';

interface VehicleSearchProps {
  onSearch: (vehicles: Vehicle[]) => void;
  onLoading: (loading: boolean) => void;
}

export default function VehicleSearch({ onSearch, onLoading }: VehicleSearchProps) {
  const [vehicleId, setVehicleId] = useState('');

  const handleSearch = async () => {
    if (!vehicleId.trim()) {
      alert('请输入车辆ID');
      return;
    }

    onLoading(true);
    
    try {
      const params = new URLSearchParams();
      params.append('id', vehicleId.trim());

      const response = await fetch(`/api/vehicles/search?${params}`);
      const data = await response.json();

      if (data.success) {
        onSearch(data.data.vehicles);

        if (data.data.vehicles.length === 0) {
          alert('未找到该车辆ID对应的车辆信息');
        }
      } else {
        onSearch([]);
        alert('搜索失败，请重试');
      }
    } catch (error) {
      console.error('搜索错误:', error);
      onSearch([]);
      alert('搜索出错，请检查网络连接');
    } finally {
      onLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setVehicleId('');
    onSearch([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">车辆ID查询</h2>

        {/* 桌面端布局：输入框 + 搜索按钮 + 重置按钮 */}
        <div className="hidden sm:flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="vehicle-id" className="block text-sm font-medium text-gray-700 mb-2">
              车辆ID
            </label>
            <div className="relative">
              <input
                id="vehicle-id"
                type="text"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="请输入数据库ID，例如：11459"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {vehicleId && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            搜索
          </button>
        </div>

        {/* 移动端布局：输入框和搜索按钮各占一半 */}
        <div className="sm:hidden">
          <div className="grid grid-cols-2 gap-2 items-end">
            <div>
              <label htmlFor="vehicle-id-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                车辆ID
              </label>
              <div className="relative">
                <input
                  id="vehicle-id-mobile"
                  type="text"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入ID"
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {vehicleId && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              搜索
            </button>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
         <p className="mb-2">
           <strong>使用说明：</strong>
         </p>
         <ul className="list-disc list-inside space-y-1">
           <li>输入数据库ID进行精确查询</li>
           <li>ID是纯数字，例如：11459</li>
           <li>每个ID都是唯一的，只会返回一条结果</li>
         </ul>
       </div>
    </div>
  );
}