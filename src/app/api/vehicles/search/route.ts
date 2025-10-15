import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// 定义搜索参数类型
interface SearchParams {
  id?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: SearchParams = {
      id: searchParams.get('id') || undefined
    };

    // 只支持ID查询
    if (!params.id) {
      return NextResponse.json({
        success: false,
        error: '请提供id参数'
      }, { status: 400 });
    }

    const whereClause = 'WHERE v.id = ?';
    const queryParams = [params.id];

    // 直接查询车辆，ID查询最多只返回一条记录

    // 构建查询
    const vehiclesQuery = `
      SELECT id, vehicle_id, car_brand, car_model, year,
             current_price, original_price, fuel_type, transmission,
             description, contact_info, contact_name, phone_number
      FROM vehicles v
      ${whereClause}
    `;

    const [vehicleRows] = await pool.execute<RowDataPacket[]>(vehiclesQuery, queryParams);

    // 如果没有找到车辆，返回空结果
    if (vehicleRows.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          vehicles: [],
          pagination: null
        }
      });
    }

    // 查询车辆的图片信息
    const [imageRows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, image_url, image_order FROM vehicle_images WHERE vehicle_id = ? ORDER BY image_order ASC',
      [vehicleRows[0].vehicle_id]
    );

    const vehicle = {
      ...vehicleRows[0],
      images: imageRows,
      main_image: imageRows.length > 0 ? imageRows[0].image_url : null
    };

    return NextResponse.json({
      success: true,
      data: {
        vehicles: [vehicle],
        pagination: null
      }
    });

  } catch (error) {
    console.error('搜索车辆失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}