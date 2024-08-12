export class Chapter1 extends Phaser.Scene {
    constructor() {
        super("chapter1");
    }
    /**
     * Scene이 생성될 때 가장 먼저 호출되는 메서드입니다.
     * 여기서는 Scene의 초기 상태를 설정하거나, 다른 Scene으로부터 데이터를 받을 수 있습니다.
     */
    init() {}
    /**
     * 게임에서 필요한 리소스(이미지, 오디오, 스프라이트 시트 등)를 로드하는 데 사용
     * 이 단계에서는 모든 리소스를 미리 로드하여, 나중에 사용 시 지연 없이 즉시 사용할 수 있게 합니다.
     */
    preload() {}
    /**
     * Scene이 시작되고 리소스가 모두 로드된 후 호출됩니다.
     * 여기서 게임 객체(스프라이트, 텍스트, 그룹 등)를 생성하고, 초기 게임 상태를 설정합니다.
     * 게임의 초기 설정과 객체를 배치하는 단계입니다.
     */
    create() {
        this.scene.start("chapter2");
    }
    /**
     * Scene이 활성화되어 있을 때 매 프레임마다 호출됩니다.
     * 이곳에서 게임의 주 로직이 실행됩니다.
     * 예를 들어, 플레이어의 움직임, 충돌 감지, 게임 상태의 변화 등이 이 메서드에서 처리됩니다.
     * @param time 현재 Scene의 실행 시간
     * @param delta 프레임 간의 시간 차이
     */
    update(time: number, delta: number) {
        super.update(time, delta);
    }
    /**
     * 명시적으로 Scene을 제거할 때 호출할 수 있습니다.
     * Scene이 제거될 때 리소스를 정리하고 메모리 누수를 방지하는 데 사용됩니다.
     */
    destroy() {}
}
