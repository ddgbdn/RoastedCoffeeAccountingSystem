﻿using Microsoft.AspNetCore.Identity;
using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceContracts
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> RegisterUser(UserRegistrationDto userRegistrationDto);
        Task<IdentityResult> DeleteUser(string Username);
        Task<IEnumerable<UserDto>> GetUsers();
        Task<bool> ValidateUser(UserAuthenticationDto userAuthenticationDto);
        Task<TokenDto> CreateToken(bool populateExp);
        Task<TokenDto> RefreshToken(TokenDto tokenDto);
        Task DeleteToken(TokenDto tokenDto);
    }
}
