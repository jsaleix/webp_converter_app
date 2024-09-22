interface Props {
    loading: boolean;
    startAction: () => void;
    disabled: boolean;
}

export default function ActionsPart({ loading, startAction, disabled }: Props) {
    if (loading) return <button disabled={true}>Processing...</button>;
    return (
        <button disabled={disabled} onClick={startAction}>
            Start
        </button>
    );
}
