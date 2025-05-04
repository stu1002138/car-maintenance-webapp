import { Link } from 'react-router-dom'
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">汽車保養紀錄</h1>
          <p className="text-gray-600 mb-4">輕鬆管理您的愛車保養資訊</p>
          <p className="text-gray-600 mb-8 text-red text-sm font-bold">⚠️ 所有資料僅儲存在您本機的瀏覽器中，未上傳至任何伺服器。</p>

          <div className="flex flex-col gap-4">
            <Link to="/list">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition cursor-pointer">
                查看保養列表
              </button>
            </Link>

            <Link to="/add">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition cursor-pointer">
                新增保養紀錄
              </button>
            </Link>
            <Link to="/car-manager">
              <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition cursor-pointer">
                汽車基本資訊
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}