import { TabContext } from '@mui/lab';
import { Avatar, Box, IconButton, Rating, Stack } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import { addDays, parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import FreeCancellation from 'src/assets/icons/FreeCancellation';
import MonetizationOn from 'src/assets/icons/MonetizationOn';
import { SECONDARY } from 'src/theme/colors';
import Drawer from 'src/components/reusable/drawer/Drawer';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from 'src/components/reusable/drawer/styles';
import { useLocales } from 'src/locales';
import { appointmentApi, useGetAppointmentQuery } from 'src/redux/api/appointmentApi';
import {
  APPOINTMENT_STATUS,
  BIG_AVATAR_SIZE,
  ONE_DAY,
  SORT_ORDER,
  UTC_TIMEZONE,
  DATE_FORMAT,
} from 'src/constants';
import ReviewModal from 'src/components/review-modal/ReviewModal';
import { SeekerReview } from 'src/redux/api/reviewsApi';

import { FIRST_SELECTED_TAB, EMPTY_RATING, ORDER_TYPE } from './constants';
import { formatWorkExperienceDateRange, formatWorkExperienceDateRangeTenure } from './helpers';
import {
  DrawerDateTenure,
  DrawerItem,
  DrawerStats,
  DrawerTextHeading,
  DrawerTextTitle,
  DrawerTextValue,
  ReviewButton,
  ReviewHeader,
  SortButton,
  StyledLink,
  StyledSortIcon,
  StyledStack,
  StyledTab,
  StyledTabPanel,
  StyledTabs,
  StyledUnorderedList,
  StyledVideo,
} from './styles';

interface CaregiverDrawerProps {
  open: boolean;
  onClose: () => void;
  caregiverId: string;
  footer?: React.ReactNode;
  selectedAppointmentId?: string;
}

export default function CaregiverDrawer({
  open,
  onClose,
  caregiverId,
  footer,
  selectedAppointmentId,
}: CaregiverDrawerProps): JSX.Element | null {
  const { translate, currentLang } = useLocales();

  const { data: appointment, isSuccess } = useGetAppointmentQuery(selectedAppointmentId);

  const {
    data: selectedCaregiver,
    isLoading,
    isSuccess: isSelectedCaregiverLoaded,
    refetch,
  } = appointmentApi.useGetCaregiverDetailsQuery(caregiverId);

  const isOneDayAfterAppointment =
    isSuccess &&
    utcToZonedTime(new Date(), UTC_TIMEZONE) >= addDays(parseISO(appointment.endDate), ONE_DAY);

  const isAppointmentCompleted =
    isSuccess &&
    (appointment.status === APPOINTMENT_STATUS.Finished ||
      appointment.status === APPOINTMENT_STATUS.Completed);

  const isCaregiverHasReview =
    isSelectedCaregiverLoaded &&
    selectedCaregiver.seekerReviews.some((review) => review.userId === appointment?.userId);

  const [selectedTab, setSelectedTab] = useState<string>(FIRST_SELECTED_TAB);
  const [isReviewCaregiverModalActive, setIsReviewCaregiverModalActive] = useState<boolean>(false);
  const [isReviewButtonActive, setIsReviewButtonActive] = useState<boolean>(
    isOneDayAfterAppointment && isAppointmentCompleted && !isCaregiverHasReview
  );

  const [sortingOrderRate, setSortingOrderRate] = useState<string>('');
  const [sortingOrderDate, setSortingOrderDate] = useState<string>(SORT_ORDER.DESC);
  const [sortedReviews, setSortedReviews] = useState<SeekerReview[]>([]);

  useEffect(() => {
    setIsReviewButtonActive(
      isOneDayAfterAppointment && isAppointmentCompleted && !isCaregiverHasReview
    );
  }, [isOneDayAfterAppointment, isAppointmentCompleted, isCaregiverHasReview]);

  const handleReviewCaregiverModal = (): void =>
    setIsReviewCaregiverModalActive(!isReviewCaregiverModalActive);

  useEffect(() => {
    const reviews = [...(selectedCaregiver?.seekerReviews || [])];
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSortedReviews(reviews);
  }, [selectedCaregiver?.seekerReviews]);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleTabClick = (_event: SyntheticEvent<Element, Event>, newValue: string): void => {
    setSelectedTab(newValue);
  };

  const handleSortingChange = (orderType: string): void => {
    const reviews = [...selectedCaregiver.seekerReviews];
    if (orderType === ORDER_TYPE.rate) {
      const newSortingOrderRate =
        sortingOrderRate === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;

      setSortingOrderRate(newSortingOrderRate);
      setSortingOrderDate('');
      reviews.sort((a, b) =>
        newSortingOrderRate === SORT_ORDER.ASC ? a.rating - b.rating : b.rating - a.rating
      );
      setSortedReviews(reviews);
    } else if (orderType === ORDER_TYPE.date) {
      const newSortingOrderDate =
        sortingOrderDate === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;

      setSortingOrderDate(newSortingOrderDate);
      setSortingOrderRate('');
      reviews.sort((a, b) =>
        newSortingOrderDate === SORT_ORDER.ASC
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSortedReviews(reviews);
    }
  };

  const handleChangeSortingRate = (): void => {
    handleSortingChange(ORDER_TYPE.rate);
  };

  const handleChangeSortingDate = (): void => {
    handleSortingChange(ORDER_TYPE.date);
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerHeader>
        <IconButton size="small" onClick={onClose}>
          <ArrowBackFilled />
        </IconButton>
        <DrawerTitle>
          {selectedCaregiver.firstName} {selectedCaregiver.lastName}
        </DrawerTitle>
      </DrawerHeader>
      <DrawerStats flexDirection="row">
        <UserAvatar userId={selectedCaregiver.id} size={BIG_AVATAR_SIZE} />
        <StyledStack>
          <Stack flexDirection="column" alignItems="center">
            <StarRateIcon
              htmlColor={
                selectedCaregiver.averageRating !== EMPTY_RATING
                  ? SECONDARY.yellow
                  : SECONDARY.lg_gray
              }
            />
            <DrawerTextTitle>{translate('createAppointmentFourth.rating')}</DrawerTextTitle>
            <DrawerTextValue>{selectedCaregiver.averageRating}</DrawerTextValue>
          </Stack>
          <Stack flexDirection="column" alignItems="center">
            <FreeCancellation />
            <DrawerTextTitle>
              {translate('createAppointmentFourth.numberOfAppointments')}
            </DrawerTextTitle>
            <DrawerTextValue>{selectedCaregiver.numberOfAppointments}</DrawerTextValue>
          </Stack>
          <Stack flexDirection="column" alignItems="center">
            <MonetizationOn />
            <DrawerTextTitle>{translate('createAppointmentFourth.rate')}</DrawerTextTitle>
            <DrawerTextValue>{selectedCaregiver.caregiverInfo.hourlyRate}</DrawerTextValue>
          </Stack>
        </StyledStack>
      </DrawerStats>
      <TabContext value={selectedTab}>
        <StyledTabs
          value={selectedTab}
          scrollButtons="auto"
          onChange={handleTabClick}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <StyledTab label={translate('createAppointmentFourth.tabs.bio')} value="1" />
          <StyledTab label={translate('createAppointmentFourth.tabs.qualification')} value="2" />
          <StyledTab label={translate('createAppointmentFourth.tabs.workExperience')} value="3" />
          <StyledTab label={translate('createAppointmentFourth.tabs.services')} value="4" />
          <StyledTab label={translate('createAppointmentFourth.tabs.reviews')} value="5" />
        </StyledTabs>
        <DrawerBody>
          <StyledTabPanel value="1">
            <DrawerItem>
              <DrawerTextValue>{selectedCaregiver.caregiverInfo.description}</DrawerTextValue>
              {selectedCaregiver.caregiverInfo.videoLink && (
                <StyledVideo src={selectedCaregiver.caregiverInfo.videoLink} controls />
              )}
            </DrawerItem>
          </StyledTabPanel>
          <StyledTabPanel value="2">
            <DrawerTextTitle>
              {translate('createAppointmentFourth.tabs.qualification')}
            </DrawerTextTitle>
            {selectedCaregiver.qualifications.map((qualification) => (
              <DrawerItem key={qualification.id}>
                <Box>
                  <DrawerTextHeading>{qualification.name}</DrawerTextHeading>
                </Box>
                <Box>
                  <DrawerTextTitle>
                    {translate('createAppointmentFourth.certificateNumber')}
                  </DrawerTextTitle>
                  <DrawerTextValue>{qualification.certificateId}</DrawerTextValue>
                </Box>
                <Box>
                  <DrawerTextTitle>
                    {translate('createAppointmentFourth.certificateLink')}
                  </DrawerTextTitle>
                  <StyledLink href={qualification.link} target="_blank">
                    {qualification.link}
                  </StyledLink>
                </Box>
                <Box>
                  <DrawerTextTitle>{translate('createAppointmentFourth.period')}</DrawerTextTitle>
                  <DrawerTextValue>
                    {formatWorkExperienceDateRange(
                      qualification.dateIssued,
                      qualification.expirationDate,
                      translate
                    )}
                  </DrawerTextValue>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>
          <StyledTabPanel value="3">
            {selectedCaregiver.workExperiences.map((workExperience) => (
              <DrawerItem key={workExperience.id}>
                <Box>
                  <DrawerTextHeading>{workExperience.workplace}</DrawerTextHeading>
                  <DrawerTextTitle>{workExperience.qualifications}</DrawerTextTitle>
                </Box>
                <Box>
                  <DrawerTextTitle>{translate('createAppointmentFourth.period')}</DrawerTextTitle>
                  <Stack flexDirection="row">
                    <DrawerTextValue>
                      {formatWorkExperienceDateRange(
                        workExperience.startDate,
                        workExperience.endDate,
                        translate
                      )}
                    </DrawerTextValue>
                    <DrawerDateTenure>
                      (
                      {formatWorkExperienceDateRangeTenure(
                        workExperience.startDate,
                        workExperience.endDate,
                        currentLang.dateFnsLocale
                      )}
                      )
                    </DrawerDateTenure>
                  </Stack>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>
          <StyledTabPanel value="4">
            <DrawerItem>
              <StyledUnorderedList>
                {selectedCaregiver.caregiverInfo.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </StyledUnorderedList>
            </DrawerItem>
          </StyledTabPanel>
          <StyledTabPanel value="5">
            <StyledStack>
              <SortButton onClick={handleChangeSortingDate}>
                {translate('createAppointmentFourth.sortingDate')}
                {sortingOrderDate === SORT_ORDER.DESC || !sortingOrderDate ? (
                  <StyledSortIcon />
                ) : (
                  <StyledSortIcon sx={{ transform: 'rotate(180deg)' }} />
                )}
              </SortButton>
              <SortButton onClick={handleChangeSortingRate}>
                {translate('createAppointmentFourth.sortingRating')}
                {sortingOrderRate === SORT_ORDER.DESC || !sortingOrderRate ? (
                  <StyledSortIcon />
                ) : (
                  <StyledSortIcon sx={{ transform: 'rotate(180deg)' }} />
                )}
              </SortButton>
            </StyledStack>

            {sortedReviews.map((review) => (
              <DrawerItem key={review.id}>
                <Box display="flex" justifyContent="space-between">
                  <ReviewHeader>
                    <Avatar src={review.user.avatar || undefined} />
                    <Box>
                      <DrawerTextHeading>{`${review.user.firstName} ${review.user.lastName}`}</DrawerTextHeading>
                      <Rating name="read-only" value={review.rating} readOnly size="small" />
                    </Box>
                  </ReviewHeader>
                  <DrawerTextValue>
                    {format(new Date(review.createdAt), DATE_FORMAT)}
                  </DrawerTextValue>
                </Box>
                <Box>
                  <DrawerTextValue>{review.review}</DrawerTextValue>
                </Box>
              </DrawerItem>
            ))}
          </StyledTabPanel>

          {isReviewButtonActive && (
            <ReviewButton variant="contained" onClick={handleReviewCaregiverModal}>
              {translate('caregiverReview.reviewCaregiver')}
            </ReviewButton>
          )}
        </DrawerBody>
        <ReviewModal
          caregiverId={selectedCaregiver.id}
          caregiverInfoId={selectedCaregiver.caregiverInfo.id}
          isReviewCaregiverModalActive={isReviewCaregiverModalActive}
          setIsReviewCaregiverModalActive={setIsReviewCaregiverModalActive}
          caregiverName={`${selectedCaregiver.firstName} ${selectedCaregiver.lastName}`}
          refetchCaregiverInfo={refetch}
        />
      </TabContext>
      {!!footer && <DrawerFooter>{footer}</DrawerFooter>}
    </Drawer>
  );
}
