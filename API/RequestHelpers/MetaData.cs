namespace API.RequestHelpers
{
    //ผลลัพธ์การแบ่งหน้าที่นำไปใช้ฝั่ง client
    public class MetaData
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
    }
}