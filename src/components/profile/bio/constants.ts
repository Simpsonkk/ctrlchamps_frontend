import { BioFormValues } from 'src/components/profile/bio/types';

export const MAX_FILE_SIZE_BYTES = 52428800;

export const AVI_FORMAT = 'video/avi';
export const MOV_FORMAT = 'video/quicktime';
export const MP4_FORMAT = 'video/mp4';
export const ALLOWED_VIDEO_FORMATS = [MP4_FORMAT, MOV_FORMAT, AVI_FORMAT];

export const DEFAULT_BIO_VALUES: BioFormValues = { description: '' };
