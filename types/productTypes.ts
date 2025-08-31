export interface SegmentType {
    _id: string;
    name: string;
    icon: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface Unit {
    _id: string;
    name: string;
    set: number;
    pc: number;
    status: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

export interface BulkDiscount {
    count: number;
    discount: number;
}

export interface Brand {
    _id: string;
    name: string;
    logo: string;
    status: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

export interface Product {
    _id: string;
    name: string;
    video?: string | null;
    customer_price: number;
    b2b_price: number;
    discount_customer_price?: number;
    discount_b2b_price?: number;
    point?: number;
    new_arrival?: boolean;
    pop_item?: boolean;
    part_no?: string;
    segment_type: SegmentType[];
    min_qty?: number;
    any_discount?: number;
    brand_id?: string;
    user?: string;
    item_stock: number;
    sku_id?: string;
    tax?: number;
    hsn_code?: string;
    return_days?: number;
    return_policy?: string;
    description?: string;
    unit?: Unit;
    status?: boolean;
    trend_part?: boolean;
    createdBy?: string;
    images: string[];
    bulk_discount?: BulkDiscount[];
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    slug: string;
    brand?: Brand;
    videos?: string[]; // assuming multiple videos
}

export interface NoAuthProductBySlugResponse {
    _payload: Product;
    type: string;
    message: string;
    success: boolean;
}
