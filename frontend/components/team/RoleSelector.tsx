interface Props {
  role: string;
  onChange: (
    role: string
  ) => void;
}

export default function RoleSelector({
  role,
  onChange,
}: Props) {

  return (
    <select
      value={role}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="border p-2"
    >
      <option>
        Admin
      </option>

      <option>
        Member
      </option>

      <option>
        Viewer
      </option>
    </select>
  );
}