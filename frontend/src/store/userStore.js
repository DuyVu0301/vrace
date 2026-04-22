import { create } from "zustand";

// Chuyển sang JavaScript thuần: Xóa bỏ các interface và generic type <UserStore>
export const useUserStore = create((set) => ({
  // Dữ liệu người dùng khởi tạo
  user: null,

  // Cập nhật thông tin người dùng
  setUser: (user) => set({ user }),

  // Kết nối Strava: Cập nhật strava_id vào object user hiện tại
  connectStrava: (stravaId) =>
    set((state) => ({
      user: state.user ? { ...state.user, strava_id: stravaId } : null,
    })),

  // Ngắt kết nối Strava
  disconnectStrava: () =>
    set((state) => ({
      user: state.user ? { ...state.user, strava_id: undefined } : null,
    })),

  // Hàm logout để dọn sạch store (Vũ có thể dùng khi cần)
  clearUser: () => set({ user: null }),
}));
