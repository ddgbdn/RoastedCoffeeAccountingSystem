using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using ServiceContracts;
using Shared.DataTransferObjects;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.CodeDom.Compiler;

namespace Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        private User? _user;

        public AuthenticationService(ILoggerManager logger, IMapper mapper, IConfiguration configuration, UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> CreateToken()
        {
            var tokenOptions = GenerateTokenOptions(GetSigningCredentials(), await GetClaims());
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public async Task<IdentityResult> RegisterUser(UserRegistrationDto userRegistrationDto)
        {
            var user = _mapper.Map<User>(userRegistrationDto);

            var result = await _userManager.CreateAsync(user, userRegistrationDto.Password);

            if (result.Succeeded)
                await _userManager.AddToRolesAsync(user, userRegistrationDto.Roles);

            return result;
        }

        public async Task<bool> ValidateUser(UserAuthenticationDto userAuthenticationDto)
        {
            _user = await _userManager.FindByNameAsync(userAuthenticationDto.UserName);

            var result = _user != null && await _userManager.CheckPasswordAsync(_user, userAuthenticationDto.Password);
            if (!result)
                _logger.LogWarn($"{nameof(ValidateUser)}: Authentication failed. Wrong user name or password.");

            return result;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("RoastingSystemSecret")!);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials credentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken
            (
                issuer: jwtSettings["validIssuer"],
                audience: jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expiresIn"])),
                signingCredentials: credentials
            );

            return tokenOptions;
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, _user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            return claims;
        }
    }
}
