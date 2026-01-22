const User = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

 
  // pode da fetch usando o id como parametro / ou seja na URL /user/IDdoUser
  return <>userprofile: {id}</>;
};

export default User;
