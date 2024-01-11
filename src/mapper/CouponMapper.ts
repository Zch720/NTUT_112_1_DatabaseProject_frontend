export type CouponListDataType = {
    id: string;
    startDate: string;
    endDate: string;
    description: string;
};

export function ToCouponListViewModel(couponModel: any): CouponListDataType {
    return {
        id: couponModel.Id,
        startDate: couponModel.StartDate,
        endDate: couponModel.EndDate,
        description: couponModel.Description
    };
}