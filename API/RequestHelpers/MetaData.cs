
namespace API.RequestHelpers
{
    //ข้อมูลเกี่ยวกับการแบ่งหน้า
    public class MetaData
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
    }
}