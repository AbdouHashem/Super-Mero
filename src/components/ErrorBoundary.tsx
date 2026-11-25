import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#F8F6F0] flex items-center justify-center p-6 text-center"
        >
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-8 space-y-4">
            <h1 className="font-display text-2xl font-extrabold text-[#0F6F6B]">
              عُذْراً، حَدَثَ خَطَأٌ غَيْرُ مُتَوَقَّعٍ
            </h1>
            <p className="text-base text-[#333333]/85 leading-relaxed">
              نَعْتَذِرُ عَنْ هَذَا التَّوَقُّفِ الْمُؤَقَّتِ. يُمْكِنُكَ إِعَادَةُ تَحْمِيلِ الصَّفْحَةِ لِمُوَاصَلَةِ التَّعَلُّمِ مَعَ سُوبَر مِيرُو.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center min-h-[46px] px-6 py-2.5 rounded-xl bg-[#0F6F6B] hover:bg-[#0B5653] text-white font-display font-bold cursor-pointer"
            >
              إِعَادَةُ التَّحْمِيلِ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
