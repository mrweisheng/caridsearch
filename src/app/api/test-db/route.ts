import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // 测试数据库连接
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT 1 as test');
    
    // 获取vehicles表的数据量
    const [vehicleCount] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM vehicles');
    
    // 获取vehicle_images表的数据量
    const [imageCount] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM vehicle_images');
    
    // 获取一些示例数据
    const [sampleVehicles] = await pool.execute<RowDataPacket[]>(
      'SELECT id, vehicle_id, car_brand, car_model, year, current_price FROM vehicles LIMIT 5'
    );

    return NextResponse.json({
      success: true,
      message: '数据库连接成功',
      data: {
        connection: rows[0],
        vehicleCount: vehicleCount[0].count,
        imageCount: imageCount[0].count,
        sampleVehicles
      }
    });

  } catch (error) {
    console.error('数据库连接测试失败:', error);
    return NextResponse.json(
      { 
        success: false,
        error: '数据库连接失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}