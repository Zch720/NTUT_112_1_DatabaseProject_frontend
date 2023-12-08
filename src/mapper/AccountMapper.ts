export type AccountProfileViewModel = {
    loginId: string,
    name: string,
    address: string,
    email: string,
    phone: string
}

export function ToAccountProfileViewModel(accountModel: any): AccountProfileViewModel {
    return {
        loginId: accountModel.LoginId,
        name: accountModel.Name,
        address: accountModel.Address,
        email: accountModel.Email,
        phone: accountModel.Phone
    };
}