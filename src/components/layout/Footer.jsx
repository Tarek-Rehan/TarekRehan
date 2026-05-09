import { usePortfolioData } from '../../context/DataContext';

export default function Footer() {
  const { data } = usePortfolioData();
  const nameParts = data.profile.name.split(' ');
  const firstName = nameParts[0] || 'Alex';
  const lastName = nameParts.slice(1).join(' ') || 'Mercer';

  return (
    <footer>
      2026 Tarek Rehan · Communication Engineer
    </footer>
  );
}
