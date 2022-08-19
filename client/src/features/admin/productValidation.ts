import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required(),
    brand: yup.string().required(),
    type: yup.string().required(),
    price: yup.number().required().moreThan(99),
    quantityInStock: yup.number().required().min(0).max(200),
    description: yup.string().required(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})

/*อธิบายความหมาย
when('pictureUrl', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide an image')
})
กรณีแก้ไขให้ตรวจสอบว่า pictureUrl มีค่าเดิมหรือไม่ ถ้ามีไม่ต้อง required
*/