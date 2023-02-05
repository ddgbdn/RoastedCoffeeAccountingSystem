using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;

namespace RoastedCoffeeAccountingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreenCoffeeController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public GreenCoffeeController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/GreenCoffee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GreenCoffee>>> GetGreenCoffee()
        {
            return await _context.GreenCoffee.ToListAsync();
        }

        //GET: api/GreenCoffee/d
        [HttpGet("d")]
        public async Task<ActionResult<IEnumerable<GreenCoffee>>> GetDistinctGreenCoffee()
        {
            //Rewrite using SQL
            var notNullRegion = await _context.GreenCoffee
                .Where(c => c.Region != "")
                .GroupBy(c => c.Region)
                .Select(g => g.FirstOrDefault()!)
                .ToListAsync();

            var nullRegion = await _context.GreenCoffee
                .Where(c => c.Region == "")
                .GroupBy(c => c.Country)
                .Select(g => g.FirstOrDefault()!)
                .ToListAsync();
                
            return new ActionResult<IEnumerable<GreenCoffee>>(
                notNullRegion.Concat(nullRegion)
                .OrderByDescending(c => c.Id));
        }

        // GET: api/GreenCoffee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GreenCoffee>> GetGreenCoffee(int id)
        {
            var greenCoffee = await _context.GreenCoffee.FindAsync(id);

            if (greenCoffee == null)
            {
                return NotFound();
            }

            return greenCoffee;
        }

        // PUT: api/GreenCoffee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGreenCoffee(int id, GreenCoffee greenCoffee)
        {
            if (id != greenCoffee.Id)
            {
                return BadRequest();
            }

            _context.Entry(greenCoffee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GreenCoffeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GreenCoffee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GreenCoffee>> PostGreenCoffee(GreenCoffee greenCoffee)
        {
            _context.GreenCoffee.Add(greenCoffee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGreenCoffee), new { id = greenCoffee.Id }, greenCoffee);
        }

        // DELETE: api/GreenCoffee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGreenCoffee(int id)
        {
            var greenCoffee = await _context.GreenCoffee.FindAsync(id);
            if (greenCoffee == null)
            {
                return NotFound();
            }

            _context.GreenCoffee.Remove(greenCoffee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GreenCoffeeExists(int id)
        {
            return _context.GreenCoffee.Any(e => e.Id == id);
        }
    }
}
