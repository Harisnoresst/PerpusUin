export default function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      <h3>Filter</h3>

      <label>
        Sumber
        <select>
          <option>Semua Sumber</option>
          <option>Repository</option>
          <option>Otomasi</option>
          <option>E-book</option>
          <option>Digitalisasi</option>
          <option>Eksternal</option>
        </select>
      </label>

      <label>
        Akses
        <select>
          <option>Semua Akses</option>
          <option>Open Access</option>
          <option>Akses Lokal</option>
          <option>Request Access</option>
        </select>
      </label>
    </aside>
  )
}
