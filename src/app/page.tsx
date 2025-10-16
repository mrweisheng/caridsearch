'use client';

import { useState } from 'react';
import VehicleSearch from '@/components/VehicleSearch';
import VehicleList from '@/components/VehicleList';
import { Vehicle } from '@/types/vehicle';

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchResults: Vehicle[]) => {
    setVehicles(searchResults);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              车辆信息搜索系统
            </h1>
            <p className="text-gray-600">
              快速搜索和查看车辆详细信息
            </p>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索组件 */}
        <div className="mb-8">
          <VehicleSearch
            onSearch={handleSearch}
            onLoading={handleLoading}
          />
        </div>

        {/* 车辆列表组件 */}
        <div>
          <VehicleList
            vehicles={vehicles}
            loading={loading}
          />
        </div>
      </main>

      </div>
  );
}
