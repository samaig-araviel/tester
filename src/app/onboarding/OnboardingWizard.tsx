"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/onboarding/StepIndicator";
import ScreenTransition from "@/components/onboarding/ScreenTransition";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroductionScreen from "./screens/IntroductionScreen";
import AboutYouScreen from "./screens/AboutYouScreen";
import ChildCountScreen from "./screens/ChildCountScreen";
import ChildAgesScreen from "./screens/ChildAgesScreen";
import LocationScreen from "./screens/LocationScreen";
import SupportNeedsScreen from "./screens/SupportNeedsScreen";
import ReviewScreen from "./screens/ReviewScreen";
import DoneScreen from "./screens/DoneScreen";
import {
  saveIdentityType,
  saveChildInfo,
  saveChildAges,
  saveLocation,
  saveSupportNeeds,
  completeOnboarding,
} from "./actions";
import type { OnboardingData } from "@/lib/onboarding";

interface OnboardingWizardProps {
  initialData: OnboardingData;
}

export default function OnboardingWizard({ initialData }: OnboardingWizardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [returnToReview, setReturnToReview] = useState(false);

  const [data, setData] = useState<OnboardingData>({
    identity_type: initialData.identity_type,
    child_count: initialData.child_count,
    is_expecting: initialData.is_expecting ?? false,
    child_age_buckets: initialData.child_age_buckets,
    postcode: initialData.postcode,
    support_needs: initialData.support_needs,
    onboarding_completed: initialData.onboarding_completed ?? false,
  });

  function goToDashboard() {
    router.push("/dashboard");
  }

  function advance() {
    if (returnToReview && currentScreen !== 7) {
      setReturnToReview(false);
      setCurrentScreen(7); // Go back to review
    } else {
      setCurrentScreen((s) => s + 1);
    }
  }

  function goBack() {
    if (currentScreen > 0) {
      setCurrentScreen((s) => s - 1);
    }
  }

  function handleSkipEarly() {
    // Skip from Welcome or Introduction — mark onboarding complete and go to dashboard
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleSkipStep() {
    // Skip from screens 2-6 — advance without saving
    advance();
  }

  function handleSkipAll() {
    // Skip the entire onboarding — mark complete and go straight to dashboard
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleSkipReview() {
    // Skip from Review — mark complete and go to dashboard with partial data
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleEditFromReview(screenIndex: number) {
    setReturnToReview(true);
    setCurrentScreen(screenIndex);
  }

  function renderScreen() {
    switch (currentScreen) {
      case 0:
        return (
          <WelcomeScreen
            onNext={() => setCurrentScreen(1)}
            onSkip={handleSkipEarly}
          />
        );
      case 1:
        return (
          <IntroductionScreen
            onNext={() => setCurrentScreen(2)}
            onBack={goBack}
            onSkip={handleSkipEarly}
          />
        );
      case 2:
        return (
          <AboutYouScreen
            value={data.identity_type}
            onNext={(identityType) => {
              startTransition(async () => {
                await saveIdentityType(identityType);
                setData((d) => ({ ...d, identity_type: identityType }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 3:
        return (
          <ChildCountScreen
            childCount={data.child_count}
            isExpecting={data.is_expecting}
            onNext={(childCount, isExpecting) => {
              startTransition(async () => {
                await saveChildInfo(childCount, isExpecting);
                setData((d) => ({ ...d, child_count: childCount, is_expecting: isExpecting }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 4:
        return (
          <ChildAgesScreen
            value={data.child_age_buckets}
            onNext={(ageBuckets) => {
              startTransition(async () => {
                await saveChildAges(ageBuckets);
                setData((d) => ({ ...d, child_age_buckets: ageBuckets }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 5:
        return (
          <LocationScreen
            postcode={data.postcode}
            onNext={(postcode) => {
              startTransition(async () => {
                await saveLocation(postcode);
                setData((d) => ({ ...d, postcode }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 6:
        return (
          <SupportNeedsScreen
            value={data.support_needs}
            onNext={(needs) => {
              startTransition(async () => {
                await saveSupportNeeds(needs);
                setData((d) => ({ ...d, support_needs: needs }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 7:
        return (
          <ReviewScreen
            data={data}
            onConfirm={() => setCurrentScreen(8)}
            onBack={goBack}
            onSkip={handleSkipReview}
            onEdit={handleEditFromReview}
            isPending={isPending}
          />
        );
      case 8:
        return (
          <DoneScreen
            onFinish={() => {
              startTransition(async () => {
                await completeOnboarding();
                goToDashboard();
              });
            }}
            isPending={isPending}
          />
        );
      default:
        return null;
    }
  }

  // Step indicator maps: screens 2-8 correspond to steps 0-6
  const showStepper = currentScreen >= 2;
  const stepIndex = currentScreen - 2;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {showStepper && (
        <StepIndicator currentStep={stepIndex} />
      )}

      <div className="w-full max-w-[520px] mx-auto px-4 pb-12 flex-1 flex flex-col justify-center">
        <ScreenTransition key={currentScreen}>
          {renderScreen()}
        </ScreenTransition>
      </div>
    </div>
  );
}
