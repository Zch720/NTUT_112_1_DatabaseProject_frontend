import { test, expect } from '@jest/globals'
import { ShopListData, ToShopListViewModel } from "../src/mapper/ShopMapper"

test("mapping shop model to shop list view model", () => {
    let shopModel = {
        "Id": "fake id",
        "Name": "fake name",
        "Address": "fake address",
        "Email": "fake email",
        "Phone": "fake phone",
        "Description": "fake description",
        "Icon": "fake icon"
    };

    let result: ShopListData = ToShopListViewModel(shopModel);
   
    expect(result.shopName).toBe("fake name");
    expect(result.shopIcon).toBe("fake icon");
    expect(result.shopId).toBe("fake id");
});