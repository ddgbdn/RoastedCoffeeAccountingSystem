﻿using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IRoastingsService
    {
        Task<IEnumerable<RoastingDto>> GetRoastingsAsync(bool trackChanges);
        Task<RoastingDto> GetRoastingAsync(int id, bool trackChanges);
        Task<RoastingDto> CreateRoastingAsync(RoastingCreationDto roasting);
        Task DeleteRoastingAsync(int id, bool trackChanges);
        Task UpdateRoastingAsync(int id, RoastingUpdateDto roasting, bool trackChanges);
    }
}
