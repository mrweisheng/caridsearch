'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Vehicle {
  id: number;
  vehicle_id: string;
  car_brand: string;
  car_model: string;
  year: string;
  current_price: string | number;
  original_price: string | number | null;
  description: string;
  fuel_type: string;
  transmission: string;
  contact_info: string;
  contact_name: string;
  phone_number: string;
  main_image: string;
  images: Array<{
    id: number;
    image_url: string;
    image_order: number;
  }>;
  created_at: string;
}

interface VehicleListProps {
  vehicles: Vehicle[];
  loading: boolean;
}

export default function VehicleList({ vehicles, loading }: VehicleListProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: string | number | null | undefined) => {
    if (!price) return '价格面议';
    
    // 将价格转换为数字
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // 检查是否为有效数字
    if (isNaN(numPrice)) return '价格面议';
    
    // 将价格从元转换为万元
    const priceInWan = numPrice / 10000;
    
    return `${priceInWan.toFixed(1)}万元`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">搜索中...</span>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          未找到对应的车辆信息
        </p>
      </div>
    );
  }

  // ID查询只会返回一条记录，直接渲染车辆详情
  const vehicle = vehicles[0];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {vehicle.car_brand} {vehicle.car_model}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 图片展示 */}
          <div>
            {vehicle.images && vehicle.images.length > 0 ? (
              <div className="relative">
                <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={vehicle.images[currentImageIndex]?.image_url || vehicle.main_image}
                    alt={`${vehicle.car_brand} ${vehicle.car_model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* 图片导航按钮 */}
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => 
                          prev === 0 ? vehicle.images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => 
                          prev === vehicle.images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* 图片指示器 */}
                {vehicle.images.length > 1 && (
                  <div className="flex justify-center mt-4 gap-2">
                    {vehicle.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <PhotoIcon className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* 车辆详细信息 */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">车辆ID:</span>
                <p className="font-medium">{vehicle.vehicle_id}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">年份:</span>
                <p className="font-medium">{vehicle.year}年</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">燃料类型:</span>
                <p className="font-medium">{vehicle.fuel_type || '未知'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">变速箱:</span>
                <p className="font-medium">{vehicle.transmission || '未知'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">联系人:</span>
                <p className="font-medium">{vehicle.contact_name || '未提供'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">联系电话:</span>
                <p className="font-medium">{vehicle.phone_number || '未提供'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">现价:</span>
                <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                  {formatPrice(vehicle.current_price || 0)}
                </p>
              </div>
              {vehicle.original_price && vehicle.original_price !== vehicle.current_price && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">原价:</span>
                  <p className="font-medium text-gray-500 line-through">
                    {formatPrice(vehicle.original_price)}
                  </p>
                </div>
              )}
            </div>

            {/* 联系信息 */}
            {vehicle.contact_info && (
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">联系信息:</span>
                <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {vehicle.contact_info}
                </p>
              </div>
            )}

            {/* 车辆描述 */}
            {vehicle.description && (
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">车辆描述:</span>
                <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}