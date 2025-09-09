import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './constants'
import { IShift } from '../interfaces/shift.interface'

export const shiftsApi = createApi({
  reducerPath: 'shiftsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getShiftsList: builder.query<IShift[], {longitude: number; latitude: number;}>({
      query: ({longitude, latitude}) => {
        return {
          url: `/api/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
          method: 'GET'
        }
      },
      transformResponse: (response: { data: IShift[]}) => {
        return response.data;
      },
      providesTags: () => {
        return [{ type: 'Shifts', id: 'LIST' }];
      },
    }),
  }),
})


export const { useGetShiftsListQuery } = shiftsApi;
