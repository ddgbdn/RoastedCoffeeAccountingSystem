using AutoMapper;
using RoastedCoffeeAccountingSystem.Models;
using Shared.DataTransferObjects;

namespace RoastedCoffeeAccountingSystem.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<GreenCoffee, GreenCoffeeDto>()
                .ForCtorParam("FullRegion", 
                opt => opt.MapFrom(c => string.Join(' ', c.Country, c.Region).TrimEnd()));

            CreateMap<Roasting, RoastingDto>()
                .ForCtorParam("CoffeeFullRegion",
                opt => opt.MapFrom(r => string.Join(' ', r.Coffee.Country, r.Coffee.Region).TrimEnd()));

            CreateMap<GreenCoffeeCreationDto, GreenCoffee>();

            CreateMap<RoastingCreationDto, Roasting>();
        }
    }
}
