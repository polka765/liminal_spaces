import {
  BackroomsSection,
  CheckInSection,
  CorridorSection,
  ExitSection,
  FamiliarSection,
  InternetSection,
  PhotoSection,
  PoolSection,
  RoomSection,
  TourSection,
} from "./components/HotelSections";

export default function App() {
  return (
    <main>
      <CheckInSection />
      <FamiliarSection />
      <CorridorSection />
      <RoomSection />
      <PoolSection />
      <BackroomsSection />
      <PhotoSection />
      <InternetSection />
      <TourSection />
      <ExitSection />
    </main>
  );
}
