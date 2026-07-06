// app/profile/components/ProfileHeader.tsx
interface ProfileHeaderProps {
  user: {
    first_name?: string;
    email: string;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">Profil</h1>
      <p className="mt-4 text-xl font-light text-zinc-600">Hallo, {user.first_name || user.email}!</p>
      <p className="mt-2 text-base text-zinc-500">Verwalte deine persönlichen Daten und Sicherheitseinstellungen.</p>
    </div>
  );
}
