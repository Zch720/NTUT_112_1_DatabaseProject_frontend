import { test, expect } from '@jest/globals'
import { AccountProfileViewModel, ToAccountProfileViewModel } from "../src/mapper/AccountMapper"

test("mapping account model to account profile view model", () => {
    let accountModel = {
        "Id": "fake id",
        "LoginId": "fake loginId",
        "Name": "fake name",
        "Email": "fake email",
        "Address": "fake address",
        "Phone": "fake phone"
    }

    let result: AccountProfileViewModel = ToAccountProfileViewModel(accountModel);

    expect(result.loginId).toBe("fake loginId");
    expect(result.name).toBe("fake name");
    expect(result.address).toBe("fake address");
    expect(result.email).toBe("fake email");
    expect(result.phone).toBe("fake phone");
});