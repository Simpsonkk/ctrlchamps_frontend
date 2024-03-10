import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from 'src/redux/api/routes';
import type { RootState } from 'src/redux/rootReducer';

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface UpdateProfileRequest {
  services?: string[];
  availability?: TimeSlot[];
  timeZone?: string;
  hourlyRate?: number;
  description?: string;
}

export interface UpdateProfileResponse {
  token?: string;
}

export interface Certificate {
  id: string;
  name: string;
  certificateId: string;
  link: string;
  dateIssued: Date | string;
  expirationDate?: Date | string;
}

export interface CertificateResponse {
  name: string;
  certificateId: string;
  link: string;
  dateIssued: string;
  expirationDate: string;
  caregiverInfo: {
    id: string;
    services: string[] | null;
    availability: TimeSlot[] | null;
    timeZone: string;
    hourlyRate: number | null;
    description: string | null;
    videoLink: string | null;
  };
  id: string;
}

export interface WorkExperience {
  id: string;
  workplace: string;
  qualifications: string;
  startDate: Date | string;
  endDate?: Date | string;
}

export interface WorkExperienceResponse {
  workplace: string;
  qualifications: string;
  startDate: string;
  endDate: string;
  caregiverInfo: {
    id: string;
    services: string[] | null;
    availability: TimeSlot[] | null;
    timeZone: string | null;
    hourlyRate: number | null;
    description: string | null;
    videoLink: string | null;
  };
  id: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.profile}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken: string = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfileInformation: builder.query({
      query: () => ({
        url: `/`,
      }),
    }),
    createProfile: builder.mutation<void, void>({
      query: () => ({
        url: `/`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      { updateProfileDto: UpdateProfileRequest }
    >({
      query: ({ updateProfileDto }) => ({
        url: `/`,
        method: 'PATCH',
        body: updateProfileDto,
      }),
    }),
    uploadFile: builder.mutation<void, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadFile}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    createCertificate: builder.mutation<CertificateResponse[], { certificates: Certificate[] }>({
      query: ({ certificates }) => ({
        url: `${route.certificates}`,
        method: 'POST',
        body: { certificates },
      }),
    }),
    getCertificate: builder.query<CertificateResponse[], void>({
      query: () => ({
        url: `${route.certificates}`,
      }),
    }),
    createWorkExperience: builder.mutation<
      WorkExperienceResponse[],
      { workExperiences: WorkExperience[] }
    >({
      query: ({ workExperiences }) => ({
        url: `${route.workExperience}`,
        method: 'POST',
        body: { workExperiences },
      }),
    }),
    getWorkExperience: builder.query<WorkExperienceResponse[], void>({
      query: () => ({
        url: `${route.workExperience}`,
      }),
    }),
  }),
});

export const {
  useGetProfileInformationQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadFileMutation,
  useCreateCertificateMutation,
  useCreateWorkExperienceMutation,
  useLazyGetWorkExperienceQuery,
} = profileApi;

export default profileApi;
