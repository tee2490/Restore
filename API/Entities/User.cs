//using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //สร้างมาจาก Identity Framework
    // <int> ระบุให้เลือกคีย์ที่เป็นตัวเลขเป็น primary เนื่องจากของเดิมเป็น Text
    // สร้างความสัมพันธ์แบบ 1:1 ระหว่าง User กับ UserAddress
    public class User : IdentityUser<int>
    {
        //จะสร้างตาราง UserAddress ให้เองอัตโนมัติ
        public UserAddress Address { get; set; }
    }

}