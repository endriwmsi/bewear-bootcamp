const Footer = () => {
  return (
    <footer className="bg-accent w-full gap-1 p-8">
      <div className="text-xs font-medium">
        <p className="text-xs font-medium">
          &copy; {new Date().getFullYear()} BEWEAR
        </p>
        <p className="text-muted-foreground text-xs font-medium">
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
