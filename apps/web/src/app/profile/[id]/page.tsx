const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <h2>Profile Page {params?.id}</h2>;
};

export default ProfilePage;
