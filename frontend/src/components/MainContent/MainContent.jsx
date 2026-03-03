import "./MainContent.css";
export function MainContent({ children }) {
  return (
    <div className="appContainer__right">
      {/* Retorna lo que le pasemos como prop */}
      {children}
    </div>
  );
}
