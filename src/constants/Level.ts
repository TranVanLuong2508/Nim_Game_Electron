import type { Difficulty } from "@/types/commonType"
interface LevelStruture {
    title: string
    numPile: number,
    maxStones: number
    value: Difficulty,
    description: string
}

export const Level: Record<"easy" | "medium" | "hard", LevelStruture> = {
    easy: {
        title: "Dễ",
        numPile: 3,
        maxStones: 5,
        value: "easy",
        description: `Bot kiểu "chill chill", 80% là đi bừa, thỉnh thoảng mới nghiêm túc. Cực hợp cho newbie vào làm vài ván khởi động bộ não.`

    },
    medium: {
        title: "Trung bình",
        numPile: 6,
        maxStones: 7,
        value: "medium",
        description: `Bot bắt đầu "try hard" 60% lượt đi là tối ưu, còn lại là "tấu hài" cho bạn tí cơ hội. Số đống đá và lượng đá mỗi đống nhiều hơn, đòi hỏi bạn phải suy nghĩ chiến lược hơn để thắng. Thắng được chế độ này là cũng có quyền đi khoe rồi đó!`

    },
    hard: {
        title: "Khó",
        numPile: 9,
        maxStones: 9,
        value: "hard",
        description: `Bot bật chế độ "Hủy diệt"💀, 100% nước đi tối ưu, không có sai sót nào. Đống nhiều, đá nhiều, Bot không để bạn thở. Nếu vẫn thắng được thì xin chúc mừng, bạn chính thức là trùm cuối!`

    },

}

export default Level 