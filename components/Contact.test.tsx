import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

const ORIGINAL_FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

describe('Contact', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_FORMSPREE_ID = 'test-form-id';
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_FORMSPREE_ID = ORIGINAL_FORMSPREE_ID;
    jest.restoreAllMocks();
  });

  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello there' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
  }

  it('shows a success message after a successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/thanks.*message/i)).toBeInTheDocument()
    );
  });

  it('shows an error message when Formspree responds with a non-OK status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('shows an error message when the network request throws', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network down'));
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('shows a loading state while the request is pending', async () => {
    let resolveFetch: (value: { ok: boolean }) => void = () => {};
    (global.fetch as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );
    render(<Contact />);

    fillAndSubmit();

    expect(await screen.findByRole('button', { name: /sending/i })).toBeDisabled();

    resolveFetch({ ok: true });

    await waitFor(() =>
      expect(screen.getByText(/thanks.*message/i)).toBeInTheDocument()
    );
  });

  it('shows a configuration error and skips the network call when the form ID is missing', async () => {
    delete process.env.NEXT_PUBLIC_FORMSPREE_ID;
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/isn.t configured yet/i)).toBeInTheDocument()
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
